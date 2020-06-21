using KO_Fenix.Models.Entity;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace KO_Fenix.Models.Sinif
{
    public static class emailsender
    {

        public static bool kodGonder(string username, string tip, kn_onlineEntities2 db)
        {
            if (!string.IsNullOrWhiteSpace(username))
            {

                username = username.Trim();
                var tbuserdata = db.TB_USER.FirstOrDefault(x => x.strAccountID == username);
                if (tbuserdata != null && emailsender.IsValidEmail(tbuserdata.Email))
                {

                    db.Database.ExecuteSqlCommand("Exec [sp_forgotpassword] @p0, @p1, @p2, @p3", username, tbuserdata.Email, tip, "0");
                    var forgotdata = db.TBLFORGOTPASSW.OrderByDescending(x => x.id).Take(1).FirstOrDefault(x => x.strAccountID == username && x.TIP == tip && x.ISLEM == "0");



                    var token = forgotdata.GUID;



                    //HTML Template for Send email  

                    string subject = "Kofenix.Net Şifre Yenileme Kodu";

                    string body = "<b>Şifre Yenileme kodunu kullanarak yeni bir şifre oluşturabilirsiniz. </b><br/>" + token;
                    emailsender.Mail(tbuserdata.Email, subject, body);
                    return true;
                }

            }

            return false;
        }
        public static void Mail(string sendMailAdress, string subject, string body)
        {
            SmtpClient client = new SmtpClient();
            MailAddress from = new MailAddress("mailadresi@gmail.com");
            MailAddress to = new MailAddress("sinan37coban@gmail.com");//bizim mail adresi
            MailMessage msg = new MailMessage(from, to);
            msg.IsBodyHtml = true;
            msg.Subject = subject;
            msg.Body += "Gönderen Mail Adresi " + to + " | <h1> " + body + " </h1>"; //burada başında gönderen kişinin mail adresi geliyor
            msg.CC.Add(sendMailAdress);//herkes görür
            NetworkCredential info = new NetworkCredential("sinan37coban@gmail.com", "sinan001903*");
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Credentials = info;
            client.Send(msg);



        }
        public static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
        public static bool newpasswork(string kod, string pass, string passnew, int tip, kn_onlineEntities2 db)
        {
            if (!string.IsNullOrWhiteSpace(kod))
            {
                kod = kod.Trim();
                var fgdata = db.TBLFORGOTPASSW.FirstOrDefault(x => x.GUID == kod);
                var countcode = Convert.ToUInt32(fgdata.TIP);
                if (countcode == tip)
                {
                    db.Database.ExecuteSqlCommand("Exec [sp_updatepassword] @p0, @p1, @p2, @p3, @p4", fgdata.strAccountID, fgdata.Email, fgdata.GUID, pass, passnew);

                }

                return true;
            }

            return false;
        }
    }
}