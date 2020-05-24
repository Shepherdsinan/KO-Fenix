using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KO_Fenix.Models.Entity;
using KO_Fenix.Models.Sinif;

namespace KO_Fenix.Controllers
{
    public class TicketController : Controller
    {
        // GET: Ticket
        kn_onlineEntities2 db = new kn_onlineEntities2();
        Class1 cs = new Class1();
        public ActionResult Index()
        {
            //Daha sonra detaylı araştır fantazilere bak :)
            //cs.Deger9 = db.C_DESTEK.Where(x => x.StrAccountID == Session["strAccountID"].ToString()).ToList();
            //cs.Deger9 = (from a in db.C_DESTEK where a.StrAccountID == Session["strAccountID"] select a).ToList();
            cs.Deger9 = db.C_DESTEK.ToList();
            return View(cs);
        }

        public ActionResult Send()
        {
            cs.Deger10 = db.ACCOUNT_CHAR.ToList();
            return View(cs);
        }
        [HttpGet]
        public ActionResult Saveticket()
        {            
            return View();
        }
        [HttpPost]
        public ActionResult Saveticket(Class1 p1)
        {
            
            C_DESTEK kayit = new C_DESTEK
            {
                StrUserID = p1.strUserID,
                StrCatID = p1.Subject,
                StrDurum = "0",
                StrTarih = DateTime.Now,
                StrAccountID = Session["strAccountID"].ToString()
            };
            db.C_DESTEK.Add(kayit);
            db.SaveChanges();
            var mesajid = kayit.id;
            C_DESTEKMESAJ mesajekle = new C_DESTEKMESAJ();
            mesajekle.Ticketid = mesajid;
            mesajekle.Date = DateTime.Now;
            mesajekle.StrUserID = p1.strUserID;
            mesajekle.Message = p1.Message;
            mesajekle.Senduser = "0";
            db.C_DESTEKMESAJ.Add(mesajekle);
            db.SaveChanges();
            return RedirectToAction("Read", "Ticket", new { @id = mesajid });
        }
        public ActionResult Read(int id)
        {         
            cs.Deger11 = (from a in db.C_DESTEKMESAJ where a.Ticketid == id select a).ToList();            
            return View(cs);
        }
        [HttpGet]
        public ActionResult Answer()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Answer(Class1 deger)
        {
            C_DESTEKMESAJ cevap = new C_DESTEKMESAJ();
            cevap.Ticketid = deger.Ticketid;
            cevap.StrUserID = deger.strUserID;
            cevap.Message = deger.Messageanswer;
            cevap.Senduser = "0";
            cevap.Date = DateTime.Now;
            db.C_DESTEKMESAJ.Add(cevap);
            db.SaveChanges();
            return RedirectToAction("Read", "Ticket", new { @id = deger.Ticketid });
        }
    }
}