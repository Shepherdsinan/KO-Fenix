using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
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

            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;
            return View();
        }
        
        
        
        [HttpGet]
        public ActionResult SaveMember()
        {
            
            return View();
        }
        [HttpPost]
        public ActionResult SaveMember(TB_USER p)
        {
            if (db.TB_USER.Any(x => x.strAccountID == p.strAccountID))
            {
                ModelState.AddModelError("strAccountID", ""+p.strAccountID+" isimli kayıt mevcut");
            }
            if (db.TB_USER.Any(x => x.Email == p.Email))
            {
                ModelState.AddModelError("Email", "" + p.Email + " mail adresi mevcut");
            }
            if (ModelState.IsValid)
            {                
                db.Database.ExecuteSqlCommand("Exec [kayitol] @p0, @p1, @p2, @p3, @p4, @p5", p.strAccountID, p.Password, p.Sifre, p.SealPassword, p.Email, p.Phone);
                db.SaveChanges();
                return View("SaveMember");
            }

            //doğrulama yapılmamış ise yapılacak işlemler.
            return View("Index");
        }

       


    }
}