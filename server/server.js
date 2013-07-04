

Meteor.startup(function () {
 createCoursesIfNone();
 createCategoriesIfNone();
});

 
Meteor.methods({
    
    update_userdata: function(username,email) {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                username: username,
                 emails: [{
                    address: email,
                    verified: false
                }]
            }
        });
     },
         update_userpassword: function(new_password) {
        Accounts.setPassword(Meteor.userId(), new_password)
     }
});


/*
Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish("parties", function () {
  return Parties.find(
    {$or: [{"public": true}, {invited: this.userId}, {owner: this.userId}]});
});



Meteor.publish("Subscriptions", function(){
return Subscriptions.find({});		
});
*/

function createCoursesIfNone(){
    // erstelle neue Kurse, wenns keine in der DB hat
 if (Courses.find().count() === 0) {
        createCourses();
  }
}

function createCategoriesIfNone(){
    // das gleiche für Kategorien
 if (Categories.find().count() === 0) {
        createCategories();
  }
}



function createCourses(){
    // erstelle ein String-Array f�r die Namen der Kurse
    var names = ["ASZ Geek-Noob-Nerd Treffen",
                 "Deutschkurs",
                 "Photoshop für Fortgeschrittene",
                 "Onanie",
                 "Nikola Tesla - Ein Leben in Einsamkeit",
                 "Unbenannter Kurs"];

    //erstelle ein String-Array f�r die Kursbeschreibungen
    var description = ["ein treffen für alle die sich für technologie und so interessieren",
                 "German: Ja, Nein, Vielleicht, Gut gut.",
                 "How to put the Bling-Effect.",
                 "DIY or DIE!",
                 "Wir werden einen Text über Nikola Teslas Kindheit lesen, anhand dessen wir sein Werk in in einen Historischen Kontext zu stellen versuchen.",
                 "Bitte hier Kursbeschreibung eintragen"];
                 
    var categories = ["Nerdy Courses",
    	    "Walter",
    	    "Nerdy Courses",
    	    "Nerdy Courses",
    	    "Tesla Shit",
    		"Walter"];

    // erstelle so viele Kurse, wie der Namens-Array lang ist
    for (var i = 0; i < names.length; i++)
      Courses.insert({name: names[i], createdby: "ov8zqBLipEQma5DLy", time_created: 1372810780636, time_changed: 1372810780636, categories: categories[i], description: description[i], score: Math.floor(Random.fraction()*10)*5});
}


function createCategories() {
	var names = ["Nerdy Courses",
		"Tesla Shit",
		"Walter"];
	
	for (var i = 0; i < names.length; i++)
		Categories.insert({name: names[i]});
}