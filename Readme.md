**Welcome to Art Institute of Chicago App Prototype!**
by **Johnatan Botero**

Art Institute of Chicago's App **Prototype**. created using **React Native** + **TypeScript** + **Redux** with the **Artic** API **https://api.artic.edu/**

![enter image description here](https://external.feoh2-1.fna.fbcdn.net/emg1/v/t13/7340498235556316339?url=https://repository-images.githubusercontent.com/596696673/0633cc63-c100-427e-b8c7-78538633e1d3&fb_obo=1&utld=githubusercontent.com&stp=c0.5000x0.5000f_dst-jpg_flffffff_p500x261_q75&_nc_eui2=AeEKHq37X9S3q44aasGiOOjhI-HO5Tn2srMj4c7lOfays0Cd4CtcotappGcoXutmQJM&ccb=13-1&oh=06_AbGSisoigD5L0nrvwdspDSRgJuxp_NzpA9F8DGuqx-fZUg&oe=63DEC0BC&_nc_sid=abe532)

## Main Functionalities

#### DONE

- list upcoming events (Fixed numbers)
- events Detail Screen with **CTA** button
  - local Push Notification system 💪 (Notifications are displayed one minute after press the CTA)
- custom animatable header
- scroll to Up component
- artworks with pagination
  - initial Artworks fetch
  - fetch more Artworks
  - refetch Artworks
  - artwork Detail Screen
    - header image
    - basic Artwork info
    - detailed Artwork info
    - full canvas and image visualization with pinch and zoom
    - expandable component to show more Artwork details

#### TODO

- complete Integration tests (25% missing)

# Setup

Install the complementary packages

```
yarn install
```

**iOS** additional steps

```
npx pod-install ios

# or using a custom script
yarn pod

# or use directly cocoa pods
cd ios && pod install
```

# Run project

**iOS** Steps

```
npx react-native run-ios
# or use a custom script
yarn ios
```

**Android** Steps

```
npx react-native run-android
# or use a custom script
yarn android
```

# Available Scripts

**Tests**

```
yarn test
```

**ESLint**

```
yarn lint
```

**TypeScript check**

```
yarn tsc
```
