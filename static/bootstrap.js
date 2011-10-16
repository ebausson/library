Ext.application({
    name: 'HelloExt',
    launch: function() {
        Library.Ajax.request({
            url: '/user/isLogged',
            success: function(response){
                console.log(response);
                if (responseContent.isLogged) {
                    //TODO : display application
                } else {
                    Ext.create('Library.user.AuthenticationPanel', {});
                }
            },
            failure: function(response){
                Ext.create('Library.user.AuthenticationPanel', {});
            }
        });
    }
});
