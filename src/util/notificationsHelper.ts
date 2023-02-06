import notifee, {
  AndroidStyle,
  NotificationAndroid,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { addHours, addMinutes } from 'date-fns';
import { Alert } from 'react-native';

type DiffType = {
  scheduleDate?: string | Date;
  diffUnit?: 'hours' | 'minutes';
  diffValue?: number;
};

const setTriggerDateTime = ({
  scheduleDate = new Date(),
  diffUnit = 'minutes',
  diffValue = 1,
}: DiffType): Date => {
  switch (diffUnit) {
    case 'hours':
      return addHours(new Date(scheduleDate), diffValue);
    case 'minutes':
      return addMinutes(new Date(scheduleDate), diffValue);
    default:
      return new Date(scheduleDate);
  }
};

type EventProps = {
  id?: string | null;
  body?: string;
  title?: string;
  image?: string;
  diffUnit?: 'hours' | 'minutes';
  diffValue?: number;
};

type NotificationProps = DiffType &
  EventProps & {
    image?: string;
  };

export const generateLocalNotification = async ({
  title,
  body,
  id,
  scheduleDate = new Date(),
  diffUnit = 'minutes',
  diffValue = 1,
  image,
}: NotificationProps) => {
  if (!id) {
    return Alert.alert(
      'Developer error',
      'Please verify the id parameter implementation',
    );
  }

  const channelId: string = (await notifee.createChannel({
    id: id,
    name: title || 'Default channel',
  })) as string;

  try {
    await notifee.requestPermission();

    const scheduledNotifications = await notifee.getTriggerNotificationIds();
    const triggerDate = setTriggerDateTime({
      scheduleDate,
      diffUnit,
      diffValue,
    });

    const triggerDateTimestamp = triggerDate.getTime();

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerDateTimestamp,
    };

    const android: NotificationAndroid = {
      channelId,
      smallIcon: 'ic_notification_icon',
      pressAction: {
        id: 'default',
      },
      ...(image && {
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: image,
        },
      }),
    };

    const ios = {
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
      ...(image && {
        attachments: [
          {
            url: image,
          },
        ],
      }),
    };

    if (!scheduledNotifications.includes(channelId)) {
      await notifee.createTriggerNotification(
        {
          id: channelId,
          title,
          body,
          android,
          ios,
        },
        trigger,
      );
    }
  } catch (error: any) {
    if (
      typeof error?.message === 'string' &&
      error?.message.includes('expected a unique string value')
    ) {
      Alert.alert(
        'You already have a notification scheduled for this event',
        'Do you want to cancel it?',
        [
          {
            text: 'Continue',
          },
          {
            style: 'destructive',
            text: 'Cancel notification',
            onPress: () => {
              cancelNotification(channelId);
            },
          },
        ],
      );
    } else {
      console.error('error', error);
    }
  }
};

const cancelNotification = async (notificationId: string) => {
  await notifee.cancelNotification(notificationId);
};
