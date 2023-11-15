import supabase from "./supabase";

export async function queryBooking(statusFilter, isPaidFilter) {
  // console.log(statusFilter, isPaidFilter);

  let { data, error } = await supabase.from("bookings").select("*,guests(*),rooms(*)");

  if (statusFilter) data = data.filter((booking) => booking.status === statusFilter);
  if (isPaidFilter)
    data = data.filter((booking) => {
      const isPaidFilterBoolean = isPaidFilter === "true" ? true : false;
      // console.log(isPaidFilterBoolean);
      return booking.isPaid === isPaidFilterBoolean;
    });

  if (error) throw new Error(error.message);

  return data;
}

export async function queryBreakfastPrice() {
  let { data, error } = await supabase.from("settings").select("breakfastPrice");

  if (error) throw new Error(error.message);
  return data;
}

export async function addBreakfast(id) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ hasBreakfast: true })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function addBed(newData) {
  console.log(newData);
  const { data, error } = await supabase
    .from("bookings")
    .update({ addBed: newData.addBedNum })
    .eq("id", newData.id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function addPerson(newData) {
  console.log(newData);
  const { data, error } = await supabase
    .from("bookings")
    .update({ addPerson: newData.addPersonNum })
    .eq("id", newData.id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateTotalPrice(priceData) {
  console.log(priceData);

  const { data: bookingData, error: updatePriceError } = await supabase
    .from("bookings")
    .update({ totalPrice: priceData.totalPrice, isPaid: priceData.isPaid })
    .eq("id", priceData.id)
    .select();

  if (updatePriceError) throw new Error(updateBooking);

  return bookingData;
}

export async function updateBooking(newData) {
  console.log(newData);
  const { guests: newGuests, ...newBooking } = newData;
  // const {...newData.guest,newBooking} = newData
  console.log(newBooking, newGuests);

  const { data: guestsData, error: updateGuestError } = await supabase
    .from("guests")
    .update({ ...newGuests })
    .eq("id", newGuests.id)
    .select();

  const { data: bookingData, error: updateBookingError } = await supabase
    .from("bookings")
    .update({ ...newBooking })
    .eq("id", newBooking.id)
    .select();

  if (updateGuestError || updateBookingError) {
    console.log(updateGuestError, updateBookingError);
    throw new Error(` 更新失敗`);
  }

  return { guestsData, bookingData };
}

export async function addNewGuest(newGuestData) {
  const { data: newGuest, error: addNewGuestError } = await supabase
    .from("guests")
    .insert([{ ...newGuestData }])
    .select();

  if (addNewGuestError) throw new Error(addNewGuestError);

  return newGuest;
}

export async function addNewBooking(newData) {
  console.log(newData);

  //處理新訂單
  const { data: newBooking, error: addNewBookingError } = await supabase
    .from("bookings")
    .insert([{ ...newData }])
    .select();

  if (addNewBookingError) throw new Error(addNewBookingError);

  return { newBooking };
}

export async function QueryGuests() {
  let { data: guests, error } = await supabase.from("guests").select("*");

  if (error) throw new Error("無法取得客戶資料");

  return guests;
}

export async function Pay(payData) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ isPaidAmount: payData.total, isPaid: payData.isPaid })
    .eq("id", payData.id)
    .select();

  if (error) throw new Error("更新失敗");

  return data;
}
