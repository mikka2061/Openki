Template.layout.onCreated(function() {
	this.showIntro = new ReactiveVar(Assistant.showIntro());
	this.openedIntro = new ReactiveVar(Assistant.openedIntro());
});

Template.layout.onRendered(function() {
	if (!this.openedIntro.get()) {
		this.$('.content').hide();
	}
	var instance = this;
	this.autorun(function() {
		if (instance.openedIntro.get()) {
			instance.$('.content').slideDown(400);
		} else {
			instance.$('.content').slideUp(400);
		}
	});
});


Template.layout.helpers({
	showIntro: function() {
		return Template.instance().showIntro.get();
	}
});

Template.introduction.helpers({
	openedIntro: function() {
		return Template.instance().parentInstance().openedIntro.get();
	}
});


Template.layout.events({
	"click .-toggleIntro": function(event, instance) {
		instance.openedIntro.set(true);
		if (Router.current().route.options.template === "find") {
			// Show or hide the intro
			instance.showIntro.set(!instance.showIntro.get());

			// When we're on the homepage we don't switch
			event.stopImmediatePropagation();
			return false;
		} else {
			instance.showIntro.set(true);
		}
	},

	"click .-closeIntroAtHome": function(event, instance) {
		var routerTemplate = Router.current().route.options.template;
		if (routerTemplate === "find") {
			instance.showIntro.set(false);
		}
	},

	"click .-closeIntro": function(event, instance) {
		instance.showIntro.set(false);
		Assistant.doneIntro();
	},

/*	"click .-introContainer": function(event, instance) {
		event.stopImmediatePropagation();
	},

	"click #wrap": function(event, instance) {
		instance.showIntro.set(false);
	},
*/
	"click .-toggleDetails": function(event, instance) {
		instance.openedIntro.set(!instance.openedIntro.get());
	}
});
