/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  dateOfBirth: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
  name: string,
  city: string;
  state: string;
  dateOfBirth: string;
};

declare type EventDetails = {
  $id?: string;
  userId?: string;
  title: string;
  email: string;
  description: string;
  bannerImage?: FormData;
  city: string;
  location?: string;
  date: string;
  time?: string;
  price?: number;
  tags?: string;
  organizedBy?: string;
  performers?: string;
};