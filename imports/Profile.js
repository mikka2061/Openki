export default Profile = {};
import '/imports/collections/Log.js';

Profile.Notifications = {};

/** Update the receiveNotifications setting for a user
  *
  * @param   {ID} userId - update the setting for this user
  * @param {Bool} enable - new state of the flag
  * @param   {ID} rel    - related ID for the Log (optional)
  *
  */
Profile.Notifications.change = function(userId, enable, relId, reason) {
	var rel = [userId];
	if (relId) rel.push(relId);
	Log.record('Profile.Notifications', rel,
		{ userId: userId
		, enable: enable
		, reason: reason
		}
	);

	Meteor.users.update(userId, { $set: { 'notifications': enable } });
};

/** Handle unsubscribe token
  *
  * @param {String} token - the unsubscribe token passed by the user
  * @return {Bool} whether the token was accepted
  */
Profile.Notifications.unsubscribe = function(token) {
	check(token, String);

	var accepted = false;

	// Find the relevant notification result
	Log.find({
		rel: token
	}).forEach(function(entry) {
		if (entry.body.unsubToken === token) {
			Profile.Notifications.change(entry.body.userId, false, entry._id, "unsubscribe token");
			accepted = true;
		}
	});
	return accepted;
};
