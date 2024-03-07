export const getUnitType = (type) => {
    if (type === "SR") {
        return "Single Room";
    } else if (type === "BS") {
        return "Bed Sitter";
    } else if (type === "OB") {
        return "One Bedroom";
    } else if (type === "TwB") {
        return "Two Bedroom";
    } else if (type === "TrB") {
        return "Three Bedroom";
    } else if (type === "FB") {
        return "Four Bedroom";
    }
};

export const properties = [
    {
      type: "Select",
      value: "undefined",
    },
    {
      type: "Single Room",
      value: "SR",
    },
    {
      type: "Bedsitter",
      value: "BD",
    },
    {
      type: "One Bedroom",
      value: "OBD",
    },
    {
      type: "Two Bedroom",
      value: "TWB",
    },
    {
      type: "Three Bedroom",
      value: "THB",
    },
    {
      type: "Four Bedroom",
      value: "FRB",
    },
  ];


//import AccountIcon from "../Icons/AccountIcon"
//import MonetizationDueIcon from "../Icons/MonetizationDueIcon"
//import MonetizationIcon from "../Icons/MonetizationIcon"
//import PersonIcon from "../Icons/PersonIcon"
import AddIcon from '@mui/icons-material/Add';

//TMS....

// Comments images Imports
//import img1 from "../images/img1.png";
//import img2 from "../images/img2.png";
//import img3 from "../images/img3.png";


// Comments Card Data
//export const CommentsData = [
//    {
//      img: img1,
//      name: "John Wick",
//      comment: "Raising complaints about ongoing noise disturbances during late hours, affecting our peacefulness sleep.",
//      time: "25 seconds ago",
//    },
//    {
//      img: img2,
//      name: "James Bond",
//      comment: "There is a significant delay in addressing maintenance requests, causing inconvenience in our living spaces.",
//      time: "30 minutes ago",
//    },
//    {
//      img: img3,
//      name: "Black Widow",
//      comment: "There is a persistent shortage of water supply in the apartment complex leading to difficulties in daily activities.",
//      time: "2 hours ago",
//    },
//  ];
////Data being showed in the Property main page
export const propertyData = [

    {
        title: 'CASCADE APARTMENT 1',
        subtitle: 'Cascade Apartments off of Mombasa Road',
        description: '"100KM off main Road"',
        //icon: PersonIcon
    },
    {
        title: 'CASCADE APARTMENT 2',
        subtitle: 'Cascade Apartments off of Mombasa Road',
        description: '"100KM off main Road"',
        //icon: PersonIcon
    },

    {
        title: 'CASCADE APARTMENT 3',
        subtitle: 'Cascade Apartments off of Mombasa Road',
        description: '"100KM off main Road"',
        //icon: PersonIcon
    },
    {
        title: 'CASCADE APARTMENT 4',
        subtitle: 'Cascade Apartments off of Mombasa Road',
        description: '"100KM off main Road"',
        //icon: PersonIcon
    },



]

export const propertyAdd = [
    {
        title: "EGEGGEGE",
        isMoney: false,
        link: "View total rent due",
        amount: 100,
        percentage : 20,
        icon:   AddIcon
    }]



//export const properties = [
//    {
//        title: "NUMBER OF PROPERTIES",
//        isMoney: false,
//        link: "See all properties",
//         amount: 100,
//         percentage : 20,
//        icon: PersonIcon
//    },
//    {
//        title: "NUMBER OF PROPERTIES",
//        isMoney: false,
//        link: "See all properties",
//         amount: 100,
//         percentage : 20,
//        icon: PersonIcon
//    },
//    {
//        title: "NUMBER OF PROPERTIES",
//        isMoney: false,
//        link: "See all properties",
//         amount: 100,
//         percentage : 20,
//        icon: PersonIcon
//    },
//    ]
//
//
//
//
////Data being showed in the Property main page
export const pricingData = [
    {
        title: 'KSH 2500',
        subtitle: '0-30 Units',
        description: 'For Owners with less than 30 Units',
    },
    {
        title: 'KSH 5000',
        subtitle: ' 31-50',
        description: 'For Owners with more than 30 Units but less than 50',

    },

    {
        title: 'KSH 20,000',
        subtitle: ' 51-100 Units',
        description: 'For Owners with more than 51 Units but less than 100',

    },
    {
        title: 'KSH 30,000',
        subtitle: ' 101 + Units',
        description: ' KSH 30,000 is the base fee and additional 1% of Revenue is charged.',

    },



]

// Sample array of items  for browse page
export const sampleItems = [
    {
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1',
        title: 'Cascade Plaza',
        distance: '500m from Juja City Mall',
        freeWifi: 'Free wifi installation',
        apartmentDescription: 'Spacious Apartment with Air conditioning',
        features: 'Laundry area • Underground packing • Rooftop oasis',
        backupGenerator: 'Backup Generator',
        partyParadise: 'Join us today, your private party paradise awaits!!!',
        ratingLabel: 'Excellent',
        rating: '8.9',
        price: '$112',
        taxAndFees: 'Includes taxes and fees',
        availabilityButton: 'See availability',
    },
    {
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1',
        title: 'Cascade Plaza',
        distance: '500m from Juja City Mall',
        freeWifi: 'Free wifi installation',
        apartmentDescription: 'Spacious Apartment with Air conditioning',
        features: 'Laundry area • Underground packing • Rooftop oasis',
        backupGenerator: 'Backup Generator',
        partyParadise: 'Join us today, your private party paradise awaits!!!',
        ratingLabel: 'Excellent',
        rating: '8.9',
        price: '$112',
        taxAndFees: 'Includes taxes and fees',
        availabilityButton: 'See availability',
    },
    {
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1',
        title: 'Cascade Plaza',
        distance: '500m from Juja City Mall',
        freeWifi: 'Free wifi installation',
        apartmentDescription: 'Spacious Apartment with Air conditioning',
        features: 'Laundry area • Underground packing • Rooftop oasis',
        backupGenerator: 'Backup Generator',
        partyParadise: 'Join us today, your private party paradise awaits!!!',
        ratingLabel: 'Excellent',
        rating: '8.9',
        price: '$112',
        taxAndFees: 'Includes taxes and fees',
        availabilityButton: 'See availability',
    },
    // Add more items as needed
];

// Sample array of wishlistitems
export const wishlistItems = [
    {
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1',
        title: 'Cascade Plaza',
        distance: '500m from Juja City Mall',
        freeWifi: 'Free wifi installation',
        apartmentDescription: 'Spacious Apartment with Air conditioning',
        features: 'Laundry area • Underground packing • Rooftop oasis',
        backupGenerator: 'Backup Generator',
        partyParadise: 'Join us today, your private party paradise awaits!!!',
        ratingLabel: 'Excellent',
        rating: '8.9',
        price: '$112',
        taxAndFees: 'Includes taxes and fees',
        availabilityButton: 'See availability',
    },
    {
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1',
        title: 'Cascade Plaza',
        distance: '500m from Juja City Mall',
        freeWifi: 'Free wifi installation',
        apartmentDescription: 'Spacious Apartment with Air conditioning',
        features: 'Laundry area • Underground packing • Rooftop oasis',
        backupGenerator: 'Backup Generator',
        partyParadise: 'Join us today, your private party paradise awaits!!!',
        ratingLabel: 'Excellent',
        rating: '8.9',
        price: '$112',
        taxAndFees: 'Includes taxes and fees',
        availabilityButton: 'See availability',
    },
    {
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1',
        title: 'Cascade Plaza',
        distance: '500m from Juja City Mall',
        freeWifi: 'Free wifi installation',
        apartmentDescription: 'Spacious Apartment with Air conditioning',
        features: 'Laundry area • Underground packing • Rooftop oasis',
        backupGenerator: 'Backup Generator',
        partyParadise: 'Join us today, your private party paradise awaits!!!',
        ratingLabel: 'Excellent',
        rating: '8.9',
        price: '$112',
        taxAndFees: 'Includes taxes and fees',
        availabilityButton: 'See availability',
    },
    // Add more items as needed
];

//Client Appointments data

export const clientAppointmentsData = [
    {name:'MIMO APARTMENTS',unit :'Bedsitter',phonenumber:'+2547789953',date:'21/06/2023',time:'14:00',status:'Confirmed' },
    {name:'MKB2 COMPLEX',unit :'Bedsitter',phonenumber:'+2547789953',date:'18/05/2023',time:'14:00',status:'Rejected' },
    {name:'JUJA APARTMENTS',unit :'2 Bedroom',phonenumber:'+2547789953',date:'21/04/2023',time:'14:00',status:'Confirmed' },
    {name:'TIFA APARTMENTS',unit :'Bedsitter',phonenumber:'+2547789953',date:'21/03/2023' ,time:'14:00',status:'Pending'},
    {name:'MREEVES COMPLEX',unit :'Bedsitter',phonenumber:'+2547789953',date:'21/02/2023' ,time:'14:00',status:'Confirmed'},

    // Add more transaction objects as needed
];

