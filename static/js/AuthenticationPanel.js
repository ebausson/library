Ext.define('Library.user.authenticationPanel', {

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
            width    : 200
            
        
        }]
    },

    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
