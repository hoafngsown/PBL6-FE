export type AdminInfo = {
  birthday: string;
  id: number;
  name: string;
  role: number;
  userName: string;
  password?: string;
  passwordDecode?: string;
};

export type User = {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  profileImageUrl: string;
  coverImage: string | null;
  coverImageUrl: string | null;
  about: string | null;
  role: string;
  isSale: boolean;
};

export interface Review {
  id: string;
  rating: number;
  reviewAt: string;
  updateAt: string | null;
  tripTime: string;
  title: string;
  content: string;
  reviewImages: ReviewImage[];
}

export interface ReviewImage {
  id: string;
  imageKey: string;
  imageUrl: string;
}

export interface Address {
  id: string;
  streetAddress: string | null;
  country: Country;
  province: Country;
  district: Country;
  ward: Ward;
}
export interface Ward {
  id: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
  description: string | null;
}

export interface ILocation {
  id: string;
  name: string;
  rating: number;
  about: string | null;
  description: string;
  isHotel: boolean;
  reviewCount: number;
  reviews: Review[];
  locationImages: LocationImage[];
  categories: Category[];
  hotel: IHotel | null;
  address: Address;
  imageUrlLocations: string[];
}

export interface IHotel {
  propertyAmenities: IPropertyAmenities[];
}
export interface IPropertyAmenities {
  icon: string;
  id: string;
  name: string;
}

export interface LocationImage {
  id: string;
  imageKey: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
}
