
import {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "./auth.js";

const style = document.createElement("style");
style.textContent = `
#authScreen {
  position: fixed; inset: 0; z-index: 99999;
  display: grid; place-items: center;
  padding: 20px; background: #080b16; color: white;
  font-family: Arial, sans-serif;
}
#authScreen .authCard {
  width: 100%; max-width: 380px; box-sizing: border-box;
  padding: 26px; border: 1px solid #343957;
  border-radius: 20px; background: #111629;
}
#authScreen h2 { margin-top: 0; }
#authScreen input, #authScreen button {
  width: 100%; box-sizing: border-box; padding: 13px;
  margin-top: 12px; border-radius: 10px; font-size: 15px;
}
#authScreen input {
  color: white; background: #080b16; border: 1px solid #454b67;
}
#authScreen button {
  border: 0; background: #7562ff; color: white; font-weight: bold;
}
#authScreen .secondary { background: #252b43; }
#authMessage { font-size: 14px; overflow-wrap: anywhere; }
#authAccount {
  position: fixed; z-index: 9998; bottom: 12px; right: 12px;
  padding: 10px; background: #111629; color: white;
  border: 1px solid #454b67; border-radius: 10px;
}
`;
document.head.appendChild(style);

const screen = document.createElement("div");
screen.id = "authScreen";
screen.innerHTML = `
  <div class="authCard">
    <h2>Business Dashboard</h2>
    <p id="authHeading">Login to your account</p>
    <form id="authForm">
      <input id="authEmail" type="email" placeholder="Email address" required>
      <input id="authPassword" type="password" placeholder="Password (6+ characters)" minlength="6" required>
      <button id="authSubmit" type="submit">Login</button>
    </form>
    <button id="authToggle" class="secondary" type="button">Create new account</button>
    <button id="authGoogle" class="secondary" type="button">Continue with Google</button>
    <p id="authMessage" role="status"></p>
  </div>
`;
document.body.appendChild(screen);

let isSignup = false;
const message = document.getElementById("authMessage");

document.getElementById("authToggle").onclick = () => {
  isSignup = !isSignup;
  document.getElementById("authHeading").textContent =
    isSignup ? "Create your account" : "Login to your account";
  document.getElementById("authSubmit").textContent =
    isSignup ? "Sign Up" : "Login";
  document.getElementById("authToggle").textContent =
    isSignup ? "Back to Login" : "Create new account";
  message.textContent = "";
};

document.getElementById("authForm").onsubmit = async (event) => {
  event.preventDefault();
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  message.textContent = "Please wait...";
  try {
    if (isSignup) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  } catch (error) {
    message.textContent = error.message;
  }
};

document.getElementById("authGoogle").onclick = async () => {
  message.textContent = "Opening Google sign-in...";
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    message.textContent = error.message;
  }
};

onAuthStateChanged(auth, (user) => {
  let account = document.getElementById("authAccount");

  if (!user) {
    screen.style.display = "grid";
    if (account) account.remove();
    return;
  }

  screen.style.display = "none";

  if (!account) {
    account = document.createElement("button");
    account.id = "authAccount";
    account.onclick = async () => {
      if (confirm("Do you want to log out?")) {
        try {
          await signOut(auth);
        } catch (error) {
          alert(error.message);
        }
      }
    };
    document.body.appendChild(account);
  }

  account.textContent = `👤 ${user.displayName || user.email || "Account"} · Logout`;
});
