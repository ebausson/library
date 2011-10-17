Ext.define('Library.user.AuthenticationWidget', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.authentication',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        region: 'north',
        flex: 1
    }, {
        region: 'west',
        flex: 1
        // could use a TreePanel or AccordionLayout for navigational items
    }, {
        region: 'south',
        flex: 1
    }, {
        region: 'east',
        flex: 1
    }, {
        region: 'center',
        xtype: 'panel',    // TabPanel itself has no title
        items: [{
            title: 'Default Tab',
            html: 'The first tab\'s content. Others may be added dynamically'
        }]
    }],

    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
