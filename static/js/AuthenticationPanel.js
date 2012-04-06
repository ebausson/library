Ext.define('Library.user.AuthenticationWidget', {
  extend: 'Ext.window.Window',
  alias: 'library.authentication',
  locale: {
    authTitle: 'Authentication',
    createTitle: 'Create an account',
    login: 'login',
    password: 'password',
    password2: 'repeat password',
    submit: 'Submit'
  },
  initComponent: function(){
    var config = {
      xtype: 'tabpanel',
      plain: true,
      activeTab: 0,
      items: [{
        xtype: 'panel',
        title: this.locale.authTitle,
        items: [{
          xtype: 'form',
          defaults: {
            margin: 5
          },
          items: [{
            xtype: 'field',
            fieldLabel: this.locale.login,
            allowBlank: false,
            name: 'login'
          },{
            xtype: 'field',
            fieldLabel: this.locale.password,
            inputType: 'password',
            allowBlank: false,
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
          }]
        }]
      },{
        xtype: 'panel',
        title:this.locale.createTitle,
        items: [{
          xtype: 'form',
          defaults: {
            margin: 5
          }
        }]
      }]
    }


  Ext.apply(this, Ext.apply(this.initialConfig, config));

  this.callParent(arguments);
  }
});
