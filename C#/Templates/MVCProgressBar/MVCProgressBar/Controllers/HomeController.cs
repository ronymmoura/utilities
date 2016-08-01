using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace MVCProgressBar.Controllers
{
    public class HomeController : Controller
    {
        public static Progress progress = new Progress();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult DoSomething()
        {
            progress.Value = 0;

            for (decimal i = 1; i <= 5; i++)
            {
                progress.Value = (i/5*100);
                progress.Step = i;
                progress.Description = "Teste...";
                Thread.Sleep(1000);
            }
            
            return Json("Success!", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProgress()
        {
            return Json(progress, JsonRequestBehavior.AllowGet);
        }
    }

    public class Progress
    {
        public decimal Value { get; set; }

        public decimal Step { get; set; }

        private string description;
        public string Description
        {
            get { return string.Format("Step {0}: {1}", Step, description); }
            set { description = value; }
        }
    }
}