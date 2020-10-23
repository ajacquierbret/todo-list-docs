---
id: tech-doc
title: Technical Documentation
sidebar_label: Technical Documentation
---

###### Here you will find relevent informations about how this program works under the hood, and which code structure is implemented.



### Prototypes

This program uses the most common and adequate way to code a robust architecture in Javascript, the not so well-known prototypes.
It allows us to reference deeply nested functions and methods inside our code, so that actions are accessible by every part of the codebase, and that every instance of main objects inherits its properties, because they are all prototypes of these objects.
For more accurate and precise informations about prototypes, please read the [MDN Documentation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes).



### Model-View-Template pattern  (MVT) + Controller

But how would our code be organized is such way that we could make this project scalable and easy to maintain ?
The answer is simple and has been in the center of great debates since years now in the Javascript community, and even in the whole software development ecosystem : the MVT pattern.
Aimed to structure large codebases this pattern allows us to build an app following some principles :

• All the DOM related content, what is meant to be the main structure of our HTML pages, is the template. By doing so, we can define two or one-way binding, so that corresponding variables will be inserted into our HTML pages when our model will decide to do so.

• The model handles all of the data, it can be connected with some databases or some local storage implementations, and will basically provide informations about what to insert into our pages, or give data that the controller can use. In our case, we have a local store for the data storage.

• All the business logic related content takes place inside our controller, it is, in fact, where we will implement the logics and reactions to user actions.

• According to the controller decisions, the view will render our template.

Of course, this is a very short and mostly non precise depiction of what is the MVT pattern. What you should note is that this pattern, among many others, is the keystone of a our application structure, and that it allows us to prevent a codebase being flooded by a pile of hacks, so that it stays perfectly understandable, maintainable, scalable, and crystal clear.

But what about the Controller in the name MVT ? Well, this app uses a controller pattern based file so that the business logic is deported from the rest of the codebase, it is then easier to maintain and to understand, and is what we could call a framework.
We could eventually call this pattern MVT+C.

A lot of frameworks out there use the MVT pattern, think about Vue, React, Angular...


### Business & data flow

Based on what I said above, you should have a better idea of actions flows that are taking place inside our todo app. 

When a user wants to, for instance, add a task to the todo list, he will interact with our view (well, also the template, but let's stay simple), and press the ENTER key of his keyboard. By doing so, our controller will receive the name of the task, and will tell the model to create a new item, which will update the store accordingly. 

```js
// controller.js

Controller.prototype.addItem = function (title) {
		var self = this;

		if (title.trim() === '') {
			return;
		}

		self.model.create(title, function () {
			self.view.render('clearNewTodo');
			self._filter(true);
		});
	};
```



```js
// model.js

Model.prototype.create = function (title, callback) {
		title = title || '';
		callback = callback || function () {};

		var newItem = {
			title: title.trim(),
			completed: false
		};

		this.storage.save(newItem, callback);
	};
```

When the store has been updated, the controller will tell the view to empty the input, because it is now stored inside our local storage : `self.view.render('clearNewTodo');`

Then, the controller calls its own `_filter` method with an argument equal to `true`, what will force a re-painting of todos items based on the active route :

```js
// controller.js

Controller.prototype._filter = function (force) {
		var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

		// Update the elements on the page, which change with each completed todo
		this._updateCount();

		// If the last active route isn't "All", or we're switching routes, we
		// re-create the todo item elements, calling:
		//   this.show[All|Active|Completed]();
		if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
			this['show' + activeRoute]();
		}

		this._lastActiveRoute = activeRoute;
	};
```



This function-object (because we're talking about prototypes, I invite you to read the MDN docs about this technical term) will then call one of the three methods aimed to render our view :

```js
// controller.js

/**
	 * An event to fire on load. Will get all items and display them in the
	 * todo-list
	 */
	Controller.prototype.showAll = function () {
		var self = this;
		self.model.read(function (data) {
			self.view.render('showEntries', data);
		});
	};

	/**
	 * Renders all active tasks
	 */
	Controller.prototype.showActive = function () {
		var self = this;
		self.model.read({ completed: false }, function (data) {
			self.view.render('showEntries', data);
		});
	};

	/**
	 * Renders all completed tasks
	 */
	Controller.prototype.showCompleted = function () {
		var self = this;
		self.model.read({ completed: true }, function (data) {
			self.view.render('showEntries', data);
		});
	};
```

Let's dive a bit into the view now. Here let's say the `showAll` function-object has been called.

So here's our `showEntries` method of the view :

```js
// view.js

showEntries: function () {
	self.$todoList.innerHTML = self.template.show(parameter);
},
```

The view will tell our template to place the data provided as an argument with the function call inside our page, and the template knows exactly where to put this data :

```js
// template.js

Template.prototype.show = function (data) {
		var i, l;
		var view = '';

		for (i = 0, l = data.length; i < l; i++) {
			var template = this.defaultTemplate;
			var completed = '';
			var checked = '';

			if (data[i].completed) {
				completed = 'completed';
				checked = 'checked';
			}

			template = template.replace('{{id}}', data[i].id);
			template = template.replace('{{title}}', escape(data[i].title));
			template = template.replace('{{completed}}', completed);
			template = template.replace('{{checked}}', checked);

			view = view + template;
		}

		return view;
	};
```

Now, the user will see his brand new fresh task appended to the list !
It seems a bit complicated and deeply nested at first sight, but don't worry, you will thank me later when our codebase will grow.

Here, the plain power of JS prototypes and software design systems are provided to our app, and this will be a huge benefit when scaling up this todo list.

Of course, there are a lot of other interactions that this app provides, but for the sake of simplicity I just explained you one. Now you can retrace every user action based on this principle, and be aware of what's taking place under the hood.


### Tests

Of course, in addition to using well-known software design principles, we need to continuously test the functionalities of our app, so that when a piece of code is added or modified, we instantly know if it's breaking something !

Every test has been written with Jasmine, which is a powerful testing library.
All tests are located inside the `test/` directory.

Here's a preview of a test aimed to make sure all entries are shown to users when the app is opened :

```js
it('should show entries on start-up', function () {
		var todo = [{title: 'my todo'}, {title: 'my todo 2', completed: true}];
		setUpModel([todo]);

		subject.setView('');

		expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);
		expect(view.render).toHaveBeenCalledWith('setFilter', '');
	});
```

If you want to run or add tests, you'll need to use a package manager, such as yarn or npm. I couldn't be more enthousiast about yarn if you don't know which one to choose.

Then, inside the project's root, run :

`yarn install` or `npm install`

This command will install all Jasmine dependancies, allowing you to use tests functionnalities.
To run all tests, just open the `test/SpecRunner.html` file inside any browser.

You're set !