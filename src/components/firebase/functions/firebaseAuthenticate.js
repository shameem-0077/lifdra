import { useDispatch, useSelector } from "react-redux";

export default function firebaseAuthenticate(name, access_token) {
  const { user_data } = useSelector((state) => state);
  const dispatch = useDispatch();
  axios
    .get(
      "https://developers-accounts.talrop.com/api/v1/users/firebase/auth/login/",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((response) => {
      const { status_code, data } = response.data;

      const token = data.token;

      if (status_code === 6000)
        signInWithCustomToken(auth, token)
          .then((userCredential) => {
            // Signed in
            // setMyId(userCredential.user.uid);
            const roomId =
              userCredential.user.uid +
              userCredential.user.uid.split("").reverse().join("");
            dispatch({
              type: "UPDATE_USER_DATA",
              user_data: {
                ...user_data,
                uid: userCredential.user.uid,
                roomId: roomId,
              },
            });

            async function getUser() {
              const docRef = doc(db, "users", user.uid);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                updateDoc(doc(db, "users", user.uid), {
                  isOnline: true,
                });
              } else {
                setDoc(doc(db, "users", user.uid), {
                  name,
                  username: "",
                  uid: user.uid,
                  createdAt: Timestamp.fromDate(new Date()),
                  isOnline: true,
                  isTyping: false,
                  isStudent: true,
                });
              }
            }

            getUser();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });
      else {
      }
    })
    .catch((error) => {});
}
