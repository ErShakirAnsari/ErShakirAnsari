
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author Shakir
 * @date Sep 18, 2020 - 3:11:03 PM
 */
public class ImageHtmlCreator
{
	private static final String lastModified = getLastModified();
	private static final String rootPath = "E:\\netbeans\\git\\personals\\ershakiransari.io\\cdn\\images";

	public static void main(String[] args) throws IOException
	{
//		System.out.println("ImageHtmlCreator.main() - "+new Date(1563080326000l));
		walker(new File(rootPath));
	}

	private static void walker(File file) throws IOException
	{
		File[] files = file.listFiles();

		String relativePath = "";
		String path = file.getAbsolutePath().replace(rootPath, "");
		for (char c : path.toCharArray())
		{
			if (c == '\\')
			{
				relativePath += "../";
			}
		}

		String breadcrumb = getBreadcrumb(relativePath, path);
		String folderBody = "";
		String fileBody = "";

		if (files.length > 0)
		{
			for (File child : files)
			{
				if (child.isDirectory())
				{
					walker(child);
					folderBody += getFolderBody(relativePath, child);
				} else
				{
					fileBody += getFileBody(child);
				}
			}

			breadcrumb = breadcrumb + "\n";
			folderBody = folderBody + "\n";
			fileBody = fileBody + "\n";
			String html = getHtml(relativePath, breadcrumb, folderBody, fileBody);

			writeFile(new File(file, "index.html"), html);

		} else
		{
			System.out.println("CdnImageHtmlCreator.walker() - empty folder: " + file.getAbsolutePath());
			System.out.println("CdnImageHtmlCreator.walker() - .empty file created: " + new File(file, ".empty").createNewFile());
		}
	}

	private static String getCommentHeader()
	{
		return "<!--\n"
				+ "  /$$$$$$  /$$   /$$ /$$$$$$$\n"
				+ " /$$__  $$| $$  /$$/| $$__  $$\n"
				+ "| $$  \\__/| $$ /$$/ | $$  \\ $$\n"
				+ "|  $$$$$$ | $$$$$/  | $$$$$$$/\n"
				+ " \\____  $$| $$  $$  | $$__  $$\n"
				+ " /$$  \\ $$| $$\\  $$ | $$  \\ $$\n"
				+ "|  $$$$$$/| $$ \\  $$| $$  | $$\n"
				+ " \\______/ |__/  \\__/|__/  |__/\n"
				+ "\n"
				+ "\"THE WEB PAGE(S) IS/ARE PROPERTY OF JAXER\"\n"
				+ "- NO WARRANTY EXPRESSED OR IMPLIED.\n"
				+ "- USE AT YOUR OWN RISK.\n"
				+ "- USE YOUR OWN COPY.\n"
				+ "- IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO NOT CONTROL.\n"
				+ "- SOME OF THE CONTENT(S) IS/ARE COPIED FROM THE WWW, IS/ARE UNCHANGED AND FOR ONLY PERSONAL USE.\n"
				//				+ "---------------------------------------------------------------------------------------------- -->\n"
				+ "-->\n"
				+ "<!-- Last modified " + lastModified + " -->\n\n";
	}

	private static String getHtml(String relativePath, String breadcrumb, String folder, String files)
	{
		return getCommentHeader()
				+ "<!DOCTYPE html>"
				+ "<html lang='en'>"
				+ "<head>"
				+ "<meta charset='UTF-8'>"
				+ "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
				+ "<meta http-equiv='X-UA-Compatible' content='ie=edge'>"
				+ "<title>Jaxer CDN Images</title>"
				+ "<link rel='stylesheet' href='" + relativePath + "../bootstrap/bootstrap-v4.4.1.min.css'>"
				+ "<script src='" + relativePath + "../bootstrap/bootstrap-v4.4.1.min.js'></script>"
				+ "<style>"
				+ "header {background-color:transparent; padding:20px; border-radius:0 0 10px 10px; box-shadow: 0 0 20px #777; margin-bottom: 20px}"
				+ "img {padding:20px; background-color:transparent; max-width: 100px}"
				+ "img.file {border:1px solid #ddd}"
				//				+ ".file-name {word-break: break-all}"
				+ ".file-name {word-break:break-word; width: 100%}"
				//				+ ".back-folder {background-color:#FBFBFB; border:1px solid #ddd; border-radius:5px}"
				//				+ ".box{background:#F0F0F0; border:1px solid #DDD; margin: 5px; border-radius:5px; text-align:center}"
				+ ".jumbotron{padding: 2rem 1rem; margin: 10px 0}"
				+ "</style>"
				+ "</head>"
				+ "<body>"
				+ ""
				+ "<div class='container-fluid'>"
				+ "<div class='jumbotron'>"
				+ "<h1 class='display-4'>CDN</h1>"
				+ "<p class='lead'>A content delivery network by <strong>jaxer&trade;</strong> for <u>personal</u> use only.</p>"
				+ "</div>"
				+ "</div>"
				+ ""
				+ "<div class='container'>"
				+ breadcrumb
				+ ""
				+ "<div class='row my-2'>"
				+ ""
				+ folder
				+ ""
				+ files
				+ ""
				+ "</div>"
				+ "</div>"
				+ ""
				+ "\n"
				+ "<script>"
				+ getScriptImageTitle()
				+ "</script>"
				+ "\n"
				+ ""
				+ "</body>"
				+ "</html>";
	}

	private static String getScriptImageTitle()
	{
		return "(function (){"
				+ "var elems = document.getElementsByTagName('img');"
				+ "for (var i = 0; i < elems.length; i++)"
				+ "{"
				+ "elems[i].setAttribute('title', elems[i].getAttribute('alt'));"
				+ "}})();";
	}

	private static String getBreadcrumb(String relativePath, String path)
	{
		//path = \gif\pixel-buddha
		System.out.println("ImageHtmlCreator.getBreadcrumb() - relativePath: [" + relativePath + "], path: [" + path + "]");

		if (path == null || path.trim().isEmpty())
		{
			return "";
		}

		if (path.endsWith("flat-preloaders"))
		{
			System.out.println("ImageHtmlCreator.getBreadcrumb() - path: [" + path + "]");
		}

		String[] paths = path.split("\\\\");

		String breadcrum = "";
		breadcrum += "\n";
		breadcrum += "<nav aria-label='breadcrumb'>";
		breadcrum += "<ol class='breadcrumb'>";

		breadcrum += "<li class='breadcrumb-item'><a href='" + relativePath + "../images/index.html'>Images</a></li>";

		for (int i = 0; i < paths.length; i++)
		{
			if (paths[i] == null || paths[i].trim().isEmpty())
			{
				continue;
			}

			String subRelativePath = "";
			for (int j = i; j < paths.length - 1; j++)
			{
				subRelativePath += "../";
			}

			if (i + 1 == paths.length)
			{
				//last
				breadcrum += "<li class='breadcrumb-item active' aria-current='page'>" + paths[i] + "</li>";
			} else
			{
				breadcrum += "<li class='breadcrumb-item'><a href='" + subRelativePath + "index.html'>" + paths[i] + "</a></li>";
			}

		}

		breadcrum += "</ol>";
		breadcrum += "</nav>";

		return breadcrum;

//		return "<nav aria-label='breadcrumb'>"
//				+ "<ol class='breadcrumb'>"
//				+ "<li class='breadcrumb-item'><a href='#'>Images</a></li>"
//				+ "<li class='breadcrumb-item'><a href='#'>Library</a></li>"
//				+ "<li class='breadcrumb-item active' aria-current='page'>Data</li>"
//				+ "</ol>"
//				+ "</nav>";
	}

	private static String getBackFolderBody(String relativePath, File f)
	{
		return "\n"
				+ "<div class='col-1 text-center'>"
				+ "<a href='../index.html'>"
				+ "<img src='" + relativePath + "../images/svgs/undo.svg' alt='" + f.getName() + "' class='back-folder'>"
				+ "<br>"
				//				+ "<h6 class='file-name'>../</h6>"
				+ "</a>"
				+ "</div>"
				+ "";

	}

	private static String getFolderBody(String relativePath, File f)
	{
		return "\n"
				+ "<div class='col-xl-1 col-lg-2 col-md-3 col-sm-4 col-6 box text-center'>"
				+ "<a href='./" + f.getName() + "/index.html'>"
				+ "<img src='" + relativePath + "../images/svgs/folder-001.svg' alt='" + f.getName() + "'>"
				+ "<br>"
				+ "<h6 class='file-name bg-white mx-2'>" + f.getName() + "</h6>"
				+ "</a>"
				+ "</div>"
				+ "";

	}

	private static String getFileBody(File f)
	{
		if (f.getName().equalsIgnoreCase("index.html"))
		{
			return "";
		}
		return "\n"
				+ "<div class='col-xl-1 col-lg-2 col-md-3 col-sm-4 col-6 box text-center'>"
				+ "<a href='./" + f.getName() + "' target='_blank'>"
				+ "<img src='" + f.getName() + "' alt='" + f.getName() + "'>"
				+ "<br>"
				+ "<h6 class='file-name'>" + f.getName() + "</h6>"
				+ "</a>"
				+ "</div>"
				+ "";
	}

	private static String getLastModified()
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return simpleDateFormat.format(new Date());
	}

	public static void writeFile(File file, String msg) throws FileNotFoundException, IOException
	{
		try (FileOutputStream fileOutputStream = new FileOutputStream(file);)
		{
			fileOutputStream.write(msg.getBytes());
		}
	}
}
