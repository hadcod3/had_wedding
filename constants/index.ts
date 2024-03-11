export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Event',
      route: '/events/create',
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
]

export const imageList = [
    {
        alt: 'image-1',
        imageLoc: 'image-1.jpg'
    },
    {
        alt: 'image-2',
        imageLoc: 'image-2.jpg'
    },
    {
        alt: 'image-3',
        imageLoc: 'image-3.jpg'
    },
    {
        alt: 'image-4',
        imageLoc: 'image-4.jpg'
    },
    {
        alt: 'image-5',
        imageLoc: 'image-5.jpg'
    },
]
  
export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
}
  