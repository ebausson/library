Ext.application({
    name: 'HelloExt',
    launch: function() {
        Ext.Ajax.request({
            url: '/user/isLogged',
            success: function(response){
                console.log(response);
                //TODO
                Ext.create('Library.user.authenticationPanel', {});
            },
            failure: function(response){
                console.log(response);
                //TODO
            }
        });
    }
});
