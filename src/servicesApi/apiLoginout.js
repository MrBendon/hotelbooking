import supabase from "./supabase";

export async function Login(loginData) {
  // console.log(loginData);
  let { data, error } = await supabase.auth.signInWithPassword({
    email: loginData.userId,
    password: loginData.userPassWord,
  });
  // console.log(error);
  if (error) throw new Error("登入失敗");

  return data;
}

export async function QueryUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function Logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error("登出失敗，請再試一次");
}
