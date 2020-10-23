(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{65:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return r})),n.d(t,"default",(function(){return d}));var o=n(2),a=n(6),l=(n(0),n(75)),i={id:"tech-doc",title:"Technical Documentation",sidebar_label:"Technical Documentation"},s={unversionedId:"tech-doc",id:"tech-doc",isDocsHomePage:!1,title:"Technical Documentation",description:"Here you will find relevent informations about how this program works under the hood, and which code structure is implemented.",source:"@site/docs/doc2.md",slug:"/tech-doc",permalink:"/docs/tech-doc",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/doc2.md",version:"current",sidebar_label:"Technical Documentation",sidebar:"someSidebar",previous:{title:"How to use",permalink:"/docs/"},next:{title:"Performance Audit",permalink:"/docs/audit"}},r=[{value:"Prototypes",id:"prototypes",children:[]},{value:"Model-View-Template pattern  (MVT) + Controller",id:"model-view-template-pattern--mvt--controller",children:[]},{value:"Business &amp; data flow",id:"business--data-flow",children:[]},{value:"Tests",id:"tests",children:[]}],c={rightToc:r};function d(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(l.b)("wrapper",Object(o.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h6",{id:"here-you-will-find-relevent-informations-about-how-this-program-works-under-the-hood-and-which-code-structure-is-implemented"},"Here you will find relevent informations about how this program works under the hood, and which code structure is implemented."),Object(l.b)("h3",{id:"prototypes"},"Prototypes"),Object(l.b)("p",null,"This program uses the most common and adequate way to code a robust architecture in Javascript, the not so well-known prototypes.\nIt allows us to reference deeply nested functions and methods inside our code, so that actions are accessible by every part of the codebase, and that every instance of main objects inherits its properties, because they are all prototypes of these objects.\nFor more accurate and precise informations about prototypes, please read the ",Object(l.b)("a",Object(o.a)({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes"}),"MDN Documentation"),"."),Object(l.b)("h3",{id:"model-view-template-pattern--mvt--controller"},"Model-View-Template pattern  (MVT) + Controller"),Object(l.b)("p",null,"But how would our code be organized is such way that we could make this project scalable and easy to maintain ?\nThe answer is simple and has been in the center of great debates since years now in the Javascript community, and even in the whole software development ecosystem : the MVT pattern.\nAimed to structure large codebases this pattern allows us to build an app following some principles :"),Object(l.b)("p",null,"\u2022 All the DOM related content, what is meant to be the main structure of our HTML pages, is the template. By doing so, we can define two or one-way binding, so that corresponding variables will be inserted into our HTML pages when our model will decide to do so."),Object(l.b)("p",null,"\u2022 The model handles all of the data, it can be connected with some databases or some local storage implementations, and will basically provide informations about what to insert into our pages, or give data that the controller can use. In our case, we have a local store for the data storage."),Object(l.b)("p",null,"\u2022 All the business logic related content takes place inside our controller, it is, in fact, where we will implement the logics and reactions to user actions."),Object(l.b)("p",null,"\u2022 According to the controller decisions, the view will render our template."),Object(l.b)("p",null,"Of course, this is a very short and mostly non precise depiction of what is the MVT pattern. What you should note is that this pattern, among many others, is the keystone of a our application structure, and that it allows us to prevent a codebase being flooded by a pile of hacks, so that it stays perfectly understandable, maintainable, scalable, and crystal clear."),Object(l.b)("p",null,"But what about the Controller in the name MVT ? Well, this app uses a controller pattern based file so that the business logic is deported from the rest of the codebase, it is then easier to maintain and to understand, and is what we could call a framework.\nWe could eventually call this pattern MVT+C."),Object(l.b)("p",null,"A lot of frameworks out there use the MVT pattern, think about Vue, React, Angular..."),Object(l.b)("h3",{id:"business--data-flow"},"Business & data flow"),Object(l.b)("p",null,"Based on what I said above, you should have a better idea of actions flows that are taking place inside our todo app. "),Object(l.b)("p",null,"When a user wants to, for instance, add a task to the todo list, he will interact with our view (well, also the template, but let's stay simple), and press the ENTER key of his keyboard. By doing so, our controller will receive the name of the task, and will tell the model to create a new item, which will update the store accordingly. "),Object(l.b)("pre",null,Object(l.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// controller.js\n\nController.prototype.addItem = function (title) {\n        var self = this;\n\n        if (title.trim() === '') {\n            return;\n        }\n\n        self.model.create(title, function () {\n            self.view.render('clearNewTodo');\n            self._filter(true);\n        });\n    };\n")),Object(l.b)("pre",null,Object(l.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// model.js\n\nModel.prototype.create = function (title, callback) {\n        title = title || '';\n        callback = callback || function () {};\n\n        var newItem = {\n            title: title.trim(),\n            completed: false\n        };\n\n        this.storage.save(newItem, callback);\n    };\n")),Object(l.b)("p",null,"When the store has been updated, the controller will tell the view to empty the input, because it is now stored inside our local storage : ",Object(l.b)("inlineCode",{parentName:"p"},"self.view.render('clearNewTodo');")),Object(l.b)("p",null,"Then, the controller calls its own ",Object(l.b)("inlineCode",{parentName:"p"},"_filter")," method with an argument equal to ",Object(l.b)("inlineCode",{parentName:"p"},"true"),", what will force a re-painting of todos items based on the active route :"),Object(l.b)("pre",null,Object(l.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// controller.js\n\nController.prototype._filter = function (force) {\n        var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);\n\n        // Update the elements on the page, which change with each completed todo\n        this._updateCount();\n\n        // If the last active route isn't \"All\", or we're switching routes, we\n        // re-create the todo item elements, calling:\n        //   this.show[All|Active|Completed]();\n        if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {\n            this['show' + activeRoute]();\n        }\n\n        this._lastActiveRoute = activeRoute;\n    };\n")),Object(l.b)("p",null,"This function-object (because we're talking about prototypes, I invite you to read the MDN docs about this technical term) will then call one of the three methods aimed to render our view :"),Object(l.b)("pre",null,Object(l.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// controller.js\n\n/**\n     * An event to fire on load. Will get all items and display them in the\n     * todo-list\n     */\n    Controller.prototype.showAll = function () {\n        var self = this;\n        self.model.read(function (data) {\n            self.view.render('showEntries', data);\n        });\n    };\n\n    /**\n     * Renders all active tasks\n     */\n    Controller.prototype.showActive = function () {\n        var self = this;\n        self.model.read({ completed: false }, function (data) {\n            self.view.render('showEntries', data);\n        });\n    };\n\n    /**\n     * Renders all completed tasks\n     */\n    Controller.prototype.showCompleted = function () {\n        var self = this;\n        self.model.read({ completed: true }, function (data) {\n            self.view.render('showEntries', data);\n        });\n    };\n")),Object(l.b)("p",null,"Let's dive a bit into the view now. Here let's say the ",Object(l.b)("inlineCode",{parentName:"p"},"showAll")," function-object has been called."),Object(l.b)("p",null,"So here's our ",Object(l.b)("inlineCode",{parentName:"p"},"showEntries")," method of the view :"),Object(l.b)("pre",null,Object(l.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// view.js\n\nshowEntries: function () {\n    self.$todoList.innerHTML = self.template.show(parameter);\n},\n")),Object(l.b)("p",null,"The view will tell our template to place the data provided as an argument with the function call inside our page, and the template knows exactly where to put this data :"),Object(l.b)("pre",null,Object(l.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"// template.js\n\nTemplate.prototype.show = function (data) {\n        var i, l;\n        var view = '';\n\n        for (i = 0, l = data.length; i < l; i++) {\n            var template = this.defaultTemplate;\n            var completed = '';\n            var checked = '';\n\n            if (data[i].completed) {\n                completed = 'completed';\n                checked = 'checked';\n            }\n\n            template = template.replace('{{id}}', data[i].id);\n            template = template.replace('{{title}}', escape(data[i].title));\n            template = template.replace('{{completed}}', completed);\n            template = template.replace('{{checked}}', checked);\n\n            view = view + template;\n        }\n\n        return view;\n    };\n")),Object(l.b)("p",null,"Now, the user will see his brand new fresh task appended to the list !\nIt seems a bit complicated and deeply nested at first sight, but don't worry, you will thank me later when our codebase will grow."),Object(l.b)("p",null,"Here, the plain power of JS prototypes and software design systems are provided to our app, and this will be a huge benefit when scaling up this todo list."),Object(l.b)("p",null,"Of course, there are a lot of other interactions that this app provides, but for the sake of simplicity I just explained you one. Now you can retrace every user action based on this principle, and be aware of what's taking place under the hood."),Object(l.b)("h3",{id:"tests"},"Tests"),Object(l.b)("p",null,"Of course, in addition to using well-known software design principles, we need to continuously test the functionalities of our app, so that when a piece of code is added or modified, we instantly know if it's breaking something !"),Object(l.b)("p",null,"Every test has been written with Jasmine, which is a powerful testing library.\nAll tests are located inside the ",Object(l.b)("inlineCode",{parentName:"p"},"test/")," directory."),Object(l.b)("p",null,"Here's a preview of a test aimed to make sure all entries are shown to users when the app is opened :"),Object(l.b)("pre",null,Object(l.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"it('should show entries on start-up', function () {\n        var todo = [{title: 'my todo'}, {title: 'my todo 2', completed: true}];\n        setUpModel([todo]);\n\n        subject.setView('');\n\n        expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);\n        expect(view.render).toHaveBeenCalledWith('setFilter', '');\n    });\n")),Object(l.b)("p",null,"If you want to run or add tests, you'll need to use a package manager, such as yarn or npm. I couldn't be more enthousiast about yarn if you don't know which one to choose."),Object(l.b)("p",null,"Then, inside the project's root, run :"),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"yarn install")," or ",Object(l.b)("inlineCode",{parentName:"p"},"npm install")),Object(l.b)("p",null,"This command will install all Jasmine dependancies, allowing you to use tests functionnalities.\nTo run all tests, just open the ",Object(l.b)("inlineCode",{parentName:"p"},"test/SpecRunner.html")," file inside any browser."),Object(l.b)("p",null,"You're set !"))}d.isMDXComponent=!0}}]);