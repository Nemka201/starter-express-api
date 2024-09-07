const { Resend } = require("resend");

const resend = new Resend("re_axsSRmv9_93DS5kBoiybHxiB484YtVE6G");
const Send = async (req, res) => {
  const { from ,to, subject, html, text } = req.body;
  const { data, error } = await resend.emails.send({
    from: from, // info@resend.dev
    to: to,
    subject: subject,
    html: html,
    text: text,
  });

  if (error) {
    return res.status(400).json({ error });
  }
  res.status(200).json({ data });
};
module.exports = {
  Send,
};
