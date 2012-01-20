Ext.define('Library.user.AuthenticationWidget', {
    extend: 'Ext.window.Window',
    alias: 'library.authentication',
    locale: {
        title: 'Authentication',
        login: 'login',
        password: 'password',
        submit: 'Submit'
    },
    initComponent: function(){
        var config = {
            title: this.locale.title,
            items: [{
                xtype: 'form',
                defaults: {
                    margin: 5
                },
                items: [{
                    xtype: 'field',
                    fieldLabel: this.locale.login,
                    name: 'login'
                },{
                    xtype: 'field',
                    fieldLabel: this.locale.password,
                    name: 'password'
                }],
                buttons: [{
                    text: this.locale.submit,
                    formBind: true, //only enabled once the form is valid
                    disabled: true,
                    handler: function() {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                success: function(form, action) {
                                   Ext.Msg.alert('Success', action.result.msg);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result.msg);
                                }
                            });
                        }
                    }
                }],
            }]
        };
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        
        this.callParent(arguments);
    }
});
