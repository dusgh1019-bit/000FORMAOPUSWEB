import type { Metadata } from 'next';
import OrderStatus from '@/components/exercitus/OrderStatus';
export const metadata:Metadata={title:'Order Status — EXERCITUS',robots:{index:false,follow:false}};
export default function Page(){return <OrderStatus/>}
