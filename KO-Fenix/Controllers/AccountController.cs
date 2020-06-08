using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using KO_Fenix.Models.Entity;
namespace KO_Fenix.Controllers
{   
    
    [Authorize]
    public class AccountController : Controller
    {
        // GET: Account
        kn_onlineEntities2 db = new kn_onlineEntities2();
        
        public ActionResult Index()
        {
           
            return View();
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            return RedirectToAction("Index", "Home");
        }
        
        public ActionResult PasswordChange()
        {
            return View();
        }
        
        public ActionResult SealPasswordChange()
        {
            return View();
        }
        
        public ActionResult Coupon()
        {
            return View();
        }
        
        public ActionResult Passsend()
        {
            return View();
        }
        
        public ActionResult SealPasssend()
        {
            return View();
        }
    }
}