Ext.define('Library.user.AuthenticationPanel', {
    // have to fix this
    config: {
        xtype  : 'panel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items  : [{
            title    : 'test',
            html     : 'toto',
            position : 'center',
            height   : 250,
            width    : 200,
            flex : 1
            
        
        }]
    },

    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
