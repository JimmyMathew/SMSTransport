let Notification = require('react-notifications')
class RenderNotification {
    createNotification = (message, type) => {
            switch (type) {
                case 'info':
                    Notification.NotificationManager.info(message,'Info');
                    break;
                case 'success':
                    Notification.NotificationManager.success(message, 'Success');
                    break;
                case 'warning':
                    Notification.NotificationManager.warning(message, 'Warning');
                    break;
                case 'error':
                    Notification.NotificationManager.error(message, 'Error!');
                    break;
            }
    };
}
module.exports = new RenderNotification;