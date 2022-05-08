using System.Web.Optimization;

namespace Backend.Challenge
{
	public static class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(
				new StyleBundle("~/Content/css")
					.Include("~/Content/styles/*.css")
			);
		}
	}
}
