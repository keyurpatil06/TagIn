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
  $id: string;
  title: string;
  date: string;
  city: string;
  description: string;
  imgURL: string;
  organizedBy?: string;
  location?: string;
  time?: string;
  price?: number;
  tags?: string[];
  performers?: string[];
  attendeesCount?: number;
};