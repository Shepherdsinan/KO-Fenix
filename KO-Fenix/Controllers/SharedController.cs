using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KO_Fenix.Models.Entity;

namespace KO_Fenix.Controllers
{
    public class SharedController : Controller
    {
        // GET: Shared
        kn_onlineEntities2 db = new kn_onlineEntities2();
        
        public ActionResult _Layout()
        {
            
            return View();
        }
        public ActionResult __Layout()
        {
            return View();
        }
        public JsonResult onlineplayergetir()
        {
            var deger = db.CURRENTUSER.Count();

            return Json(deger, JsonRequestBehavior.AllowGet);
        }
    }
}