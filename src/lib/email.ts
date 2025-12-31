
export async function sendOrderConfirmationEmail({
  email,
  orderId,
  customerName,
  totalAmount,
  items,
}: {
  email: string;
  orderId: string;
  customerName: string;
  totalAmount: number;
  items: any[];
}) {
  // Resend functionality removed as requested
  console.log(`Email sending skipped for ${email} (Order: ${orderId})`);
  return { success: true, data: { message: 'Email sending disabled' }, error: null };
}
