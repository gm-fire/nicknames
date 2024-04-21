import app from 'flarum/admin/app';
import Alert from 'flarum/common/components/Alert';
import Link from 'flarum/common/components/Link';

app.initializers.add('gm-fire/nicknames', () => {
  app.extensionData
    .for('gm-fire-nicknames')
    .registerSetting(function () {
      if (app.data.settings.display_name_driver === 'nickname') return;

      return (
        <div className="Form-group">
          <Alert dismissible={false}>
            {app.translator.trans('gm-fire-nicknames.admin.wrong_driver', { a: <Link href={app.route('basics')}></Link> })}
          </Alert>
        </div>
      );
    })
    .registerSetting({
      setting: 'gm-fire-nicknames.set_on_registration',
      type: 'boolean',
      label: app.translator.trans('gm-fire-nicknames.admin.settings.set_on_registration_label'),
    })
    .registerSetting({
      setting: 'gm-fire-nicknames.random_username',
      type: 'boolean',
      label: app.translator.trans('gm-fire-nicknames.admin.settings.random_username_label'),
      help: app.translator.trans('gm-fire-nicknames.admin.settings.random_username_help'),
    })
    .registerSetting({
      setting: 'gm-fire-nicknames.unique',
      type: 'boolean',
      label: app.translator.trans('gm-fire-nicknames.admin.settings.unique_label'),
    })
    .registerSetting({
      setting: 'gm-fire-nicknames.regex',
      type: 'text',
      label: app.translator.trans('gm-fire-nicknames.admin.settings.regex_label'),
    })
    .registerSetting({
      setting: 'gm-fire-nicknames.min',
      type: 'number',
      label: app.translator.trans('gm-fire-nicknames.admin.settings.min_label'),
    })
    .registerSetting({
      setting: 'gm-fire-nicknames.max',
      type: 'number',
      label: app.translator.trans('gm-fire-nicknames.admin.settings.max_label'),
    })
    .registerPermission(
      {
        icon: 'fas fa-user-tag',
        label: app.translator.trans('gm-fire-nicknames.admin.permissions.edit_own_nickname_label'),
        permission: 'user.editOwnNickname',
      },
      'start'
    );
});
