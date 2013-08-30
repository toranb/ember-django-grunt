App = Ember.Application.create();

App.Router.map(function() {
    this.resource("people", { path: "/" });
});

App.PeopleRoute = Ember.Route.extend({
    model: function() {
        return App.Person.find();
    }
});

App.PeopleController = Ember.ArrayController.extend({
    actions: {
        addPerson: function() {
            var person = {
                username: this.get('username')
            };
            App.Person.add(person);
        },
        deletePerson: function(person) {
            App.Person.remove(person);
        }
    }
});

App.Person = Ember.Object.extend({
    id: null,
    username: ''
});

App.Person.reopenClass({
    people: [],
    add: function(hash) {
        var person = App.Person.create(hash);
        this.people.pushObject(person);
        $.ajax({
            type: "POST",
            url: "/people/",
            data: hash,
            error: function() {
                alert("create failed");
            },
            success: function(response) {
                person.set('id', response.id);
            }
        });
    },
    remove: function(person) {
        this.people.removeObject(person);
        $.ajax({
            type: "DELETE",
            url: "/people/" + person.id + "/",
            error: function() {
                alert("delete failed");
            }
        });
    },
    find: function() {
        var self = this;
        $.getJSON('/people/', function(response) {
            response.forEach(function(hash) {
                var person = App.Person.create(hash);
                Ember.run(self.people, self.people.pushObject, person);
            });
        }, this);
        return this.people;
    }
});
