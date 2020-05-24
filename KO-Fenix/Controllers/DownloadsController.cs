using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KO_Fenix.Models.Entity;
using KO_Fenix.Models.Sinif;

namespace KO_Fenix.Controllers
{
    public class DownloadsController : Controller
    {
        // GET: Downloads
        kn_onlineEntities2 db = new kn_onlineEntities2();
        Class1 cs = new Class1();
        public ActionResult Index()
        {
            cs.Deger6 = db.C_DOWNLOADS.ToList();
            var qery = db.CURRENTUSER.Count();
            ViewBag.dgr1 = qery;

            return View(cs);
        }
    }
}