/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type EventCardProps = {
  id: string;
  title: string;
  date: string;
  city:string;
  description: string;
  imgURL: string;
};