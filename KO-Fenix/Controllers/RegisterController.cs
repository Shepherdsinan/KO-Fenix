using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using KO_Fenix.Models.Entity;

namespace KO_Fenix.Controllers
{
    public class RegisterController : Controller
    {
        // GET: Register
        kn_onlineEntities2 db = new kn_onlineEntities2();
        
        public ActionResult Index()
        {
            //var qery = db.Database.ExecuteSqlCommand("Exec [kayitol] @p0, @p1, @p2, @p3, @p4", 1, "dsfdfsd",1,2);  //new SqlParameter("@p0", p0), new SqlParameter("@p1", p1)  //new SqlParameter("@p1", p1);

          
            return View();
        }

        #region Mvckayıtol
        //[HttpGet]
        //public ActionResult SaveMember()
        //{

        //    return View();
        //}
        //[HttpPost]
        //public ActionResult SaveMember(TB_USER p)
        //{
        //    //********Bu kısım Json a çevrildi
        //    //if (db.TB_USER.Any(x => x.strAccountID == p.strAccountID))
        //    //{
        //    //    ModelState.AddModelError("strAccountID", ""+p.strAccountID+" isimli kayıt mevcut");
        //    //}
        //    //if (db.TB_USER.Any(x => x.Email == p.Email))
        //    //{
        //    //    ModelState.AddModelError("Email", "" + p.Email + " mail adresi mevcut");
        //    //}
        //    //if (ModelState.IsValid)
        //    //{                
        //    //    db.Database.ExecuteSqlCommand("Exec [kayitol] @p0, @p1, @p2, @p3, @p4, @p5", p.strAccountID, p.Password, p.Sifre, p.SealPassword, p.Email, p.Phone);
        //    //    db.SaveChanges();
        //    //    FormsAuthentication.SetAuthCookie(p.strAccountID, false);
        //    //    Session["strAccountID"] = p.strAccountID.ToString();
        //    //    Session["CreateTime"] = p.CreateTime.ToString();
        //    //    Session["phone"] = p.Phone.ToString();
        //    //    Session["Email"] = p.Email.ToString();
        //    //    return View("SaveMember");
        //    //}          

        //    //doğrulama yapılmamış ise yapılacak işlemler.
        //    return View("");
        //}
        #endregion


        [HttpPost]
        public JsonResult Ekle(string strAccountIDdt, string Passworddt, string Sifredt, string SealPassworddt, string Emaildt, string Phonedt)
        {
            if (db.TB_USER.Any(x => x.strAccountID == strAccountIDdt))
            {
                
            }
            if (db.TB_USER.Any(x => x.Email == Emaildt))
            {
                
            }
            else
            {
                db.Database.ExecuteSqlCommand("Exec [kayitol] @p0, @p1, @p2, @p3, @p4, @p5", strAccountIDdt, Passworddt, Sifredt, SealPassworddt, Emaildt, Phonedt);
                FormsAuthentication.SetAuthCookie(strAccountIDdt, false);
                Session["strAccountID"] = strAccountIDdt.ToString();
                Session["CreateTime"] = DateTime.Now.ToString();
                Session["phone"] = Phonedt.ToString();
                Session["Email"] = Emaildt.ToString();
                return Json("1");
            }
            return Json("0");

        }
        [HttpPost]
        public JsonResult namecheck(string strAccountIDdtt)
        {
           var count = db.TB_USER.Where(x => x.strAccountID == strAccountIDdtt).Count();
            return Json(count);
        }
        [HttpPost]
        public JsonResult mailcheck(string Emaildtt)
        {
            var count = db.TB_USER.Where(x => x.Email == Emaildtt).Count();
            return Json(count);
        }



    }
}