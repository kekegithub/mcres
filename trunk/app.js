/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'hdts',

    extend: 'hdts.Application',

    requires: [
      'hdts.view.login.Login'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'hdts.view.login.Login',
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to hdts.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
		launch: function () {
			Ext.Date.monthNames = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ];
			Ext.Date.dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			
		}
});
