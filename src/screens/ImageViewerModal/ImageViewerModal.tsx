import React, { useMemo } from 'react';
import ImageView from 'react-native-image-viewing';
import {
  NavigationProps,
  useNavigation,
  RootStackParamList,
  routeNames,
  useRoute,
  RouteProp,
} from '@/navigation';

export const ImageViewerModal = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<
    RouteProp<
      {
        params: RootStackParamList[routeNames.IMAGE_VIEWER];
      },
      'params'
    >
  >();

  const imageUrl = useMemo(
    () =>
      `https://www.artic.edu/iiif/2/${route.params.imageId}/full/800,/0/default.jpg`,
    [route.params.imageId],
  );

  return (
    <ImageView
      images={[{ uri: imageUrl }]}
      imageIndex={0}
      visible={true}
      onRequestClose={() => navigation.goBack()}
    />
  );
};
