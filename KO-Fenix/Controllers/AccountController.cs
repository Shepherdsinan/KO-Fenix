using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using KO_Fenix.Models.Entity;
using KO_Fenix.Models.Sinif;
namespace KO_Fenix.Controllers
{   
    
    
    public class AccountController : Controller
    {
        // GET: Account
        kn_onlineEntities2 db = new kn_onlineEntities2();
        emailsender emailgonder = new emailsender();
        [Authorize]
        public ActionResult Index()
        {
           
            return View();
        }
        [Authorize]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            return RedirectToAction("Index", "Home");
        }
        [Authorize]
        public ActionResult PasswordChange()
        {
            return View();
        }
        [Authorize]
        public ActionResult SealPasswordChange()
        {
            return View();
        }
        [Authorize]
        public ActionResult Coupon()
        {
            return View();
        }
        [Authorize]
        public ActionResult Passsend()
        {
            return View();
        }
        [Authorize]
        public ActionResult SealPasssend()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Newpw(string username)
        {

            var tbuserdata = db.TB_USER.FirstOrDefault(x => x.strAccountID == username);
            db.Database.ExecuteSqlCommand("Exec [sp_forgotpassword] @p0, @p1, @p2, @p3", username, tbuserdata.Email, "2", "0");
            var forgotdata = db.TBLFORGOTPASSW.OrderByDescending(x => x.id).Take(1).FirstOrDefault(x => x.strAccountID == username && x.TIP == "2" && x.ISLEM == "0");

            var token = forgotdata.GUID;

            //HTML Template for Send email  

            string subject = "Kofenix.Net Şifre Yenileme Kodu";

            string body = "<b>Şifre Yenileme kodunu kullanarak yeni bir şifre oluşturabilirsiniz. </b><br/><br/>" + token;
            emailgonder.Mail(tbuserdata.Email, subject, body);

            return Json("1", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Newpwcommit(string kod, string pass, string passnew)
        {
            
            var fgdata = db.TBLFORGOTPASSW.FirstOrDefault(x => x.GUID == kod);
            var countcode = Convert.ToUInt32(fgdata.TIP);
            if (countcode == 2)
            {
                db.Database.ExecuteSqlCommand("Exec [sp_updatepassword] @p0, @p1, @p2, @p3, @p4", fgdata.strAccountID, fgdata.Email, fgdata.GUID, pass, passnew);
            }

            return Json("1", JsonRequestBehavior.AllowGet);
        }

    }
}