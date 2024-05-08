# TurkToplumApp

turk toplum app with react native cli

https://reactnative.dev/docs/environment-setup

### Add Screen

    Add Screen Componets
      Title => Props =>{
        Title
        Icons
        id
      }

       <Title title="Emlak" icon={"emlak"} id={"1"} />
       // id is Main Category Id or Index

      Adv Tags => Props =>{
        id
        cateId
        title
      }
      // id is subCategory Id or Index

#### Emlak

    emlak => Home Screen single screen
    ./screens/AddAdvScreens/HomeAdv

    //emlak dummy data for database
      Post type =>{
      rent,
      sell,
      }
      housePhoto =>{
      array
      }
      House category =>{
      Building,
      villa,
      apartment,
      Studio,
      garage,
      other,
      }

      Publish by =>{
      private,
      agency,
      }

      Constructed at =>{
      time stamp
      }

      Location =>{
      location
      }

      Bed rooms =>{
      number
      }

      Bath rooms =>{
      number
      }

      Floor =>{
      number
      }

      Size =>{
      Number
      }

      Price =>{
      number
      }

      Balcony =>{
      boolean
      }

      Garage =>{
      boolean
      }

      Backyard =>{
      boolean
      }

      Elevator =>{
      boolean
      }

#### Shopping

    Shopping => Shopping Screen single screen
    ./screens/AddAdvScreens/ShopingAdv

#### Job

    Job => Jop Screen single screen
    ./screens/AddAdvScreens/JobAdv

#### fix INPUT Ccomponents with ADD adv screens

    ./components/Input.js

- [ ] INPUT KOMPOENENT FIX WITH ADD ADV SCREENS
- [ ] ADD Image Picker with NPM package
- [ ] try to automaticly Location with GPS
