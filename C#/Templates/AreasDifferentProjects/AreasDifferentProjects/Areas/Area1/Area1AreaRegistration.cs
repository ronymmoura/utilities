using System.Web.Mvc;

namespace AreasDifferentProjects
{
    public class Area1AreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Area1";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Area1_default",
                "Area1/{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "AreasDifferentProjects.Area1.Controllers" }
            );
        }
    }
}