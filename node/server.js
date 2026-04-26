const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const DATA_FILE = path.join(__dirname, "users.json");

// Middleware tắt cache để trình duyệt luôn load code mới nhất
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "ocean-blue-secret",
    resave: false,
    saveUninitialized: true,
  }),
);

// Khởi tạo file users.json nếu chưa có
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));

function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (e) {
    return [];
  }
}

const css = `<style>:root { --bg-color: #0b0f1a; --primary-blue: #00d2ff; } body { background: #0b0f1a; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; } .container { background: rgba(23, 32, 53, 0.8); padding: 2rem; border-radius: 20px; width: 320px; text-align: center; border: 1px solid rgba(255,255,255,0.1); } input { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: none; background: #161e2d; color: white; box-sizing: border-box; } button { width: 100%; padding: 12px; border: none; border-radius: 8px; background: linear-gradient(45deg, #3a7bd5, #00d2ff); color: white; cursor: pointer; font-weight: bold; } a { color: #94a3b8; font-size: 0.8rem; text-decoration: none; }</style>`;

app.get("/", (req, res) =>
  res.send(
    `${css}<div class="container"><h2>Ocean Web</h2><a href="/login">Đăng nhập</a> | <a href="/register">Đăng ký</a></div>`,
  ),
);

app.get("/register", (req, res) =>
  res.send(
    `${css}<div class="container"><h2>Đăng ký</h2><form method="POST"><input type="text" name="user" placeholder="Tài khoản" required><input type="password" name="pass" placeholder="Mật khẩu" required><button type="submit">Tạo tài khoản</button></form></div>`,
  ),
);

app.post("/register", (req, res) => {
  const { user, pass } = req.body;
  let users = loadUsers();
  if (users.find((u) => u.user === user)) return res.send("Tên đã tồn tại!");
  users.push({ user, pass });
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  res.redirect("/login");
});

app.get("/login", (req, res) =>
  res.send(
    `${css}<div class="container"><h2>Đăng nhập</h2><form method="POST"><input type="text" name="user" placeholder="Tài khoản" required><input type="password" name="pass" placeholder="Mật khẩu" required><button type="submit">Vào hệ thống</button></form></div>`,
  ),
);

app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  const users = loadUsers();
  const foundUser = users.find((u) => u.user === user && u.pass === pass);
  if (foundUser) {
    req.session.user = user;
    res.redirect("/dashboard");
  } else res.send("Sai tài khoản!");
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  res.send(
    `${css}<div class="container"><h2>Chào mừng!</h2><p>Chào bạn, <b>${req.session.user}</b></p><button onclick="window.location.href='/ai.html'">Vào trang tư vấn</button><br><br><a href="/logout">Đăng xuất</a></div>`,
  );
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// TRANG CHÍNH: Tiêm tên vào biến USER_NAME
app.get("/ai.html", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  const filePath = path.join(__dirname, "ai.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(404).send("File not found");
    // CHÈN BIẾN USER_NAME VÀO ĐẦU BODY ĐỂ ĐẢM BẢO LUÔN CÓ TRƯỚC JS
    const injectedData = data.replace(
      "<body",
      `<body data-user="${req.session.user}"`,
    );
    const finalData = injectedData.replace(
      "</head>",
      `<script>window.USER_NAME = "${req.session.user}";</script></head>`,
    );
    res.send(finalData);
  });
});

app.listen(3000, () => console.log("Server chạy tại: http://localhost:3000"));
