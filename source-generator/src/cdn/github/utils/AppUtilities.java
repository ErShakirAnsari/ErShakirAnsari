
package cdn.github.utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author SKR
 */
public class AppUtilities
{
	private static ArrayList _getChildFolderList(String root)
	{
		System.out.println("cdn.utils.Utils._getChildFolderList() - root: " + root);
		ArrayList<String> folderList = new ArrayList<>();

		for (File singleFile : new File(root).listFiles())
		{
			if (singleFile.isDirectory())
			{
				String absFolderPath = singleFile.getAbsolutePath();
				if (!absFolderPath.contains("@"))
				{
					folderList.add(absFolderPath);
				}
			}
		}
		return folderList;
	}

	private static ArrayList _getChildFileList(String root)
	{
		ArrayList<String> folderList = new ArrayList<>();

		for (File singleFile : new File(root).listFiles())
		{
			if (singleFile.isFile())
			{
				String absFolderPath = singleFile.getAbsolutePath();
				folderList.add(absFolderPath);
			}
		}
		return folderList;
	}

	public static ArrayList getChildFileList(String root)
	{
		return _getChildFileList(root);
	}

	public static ArrayList getChildFolderOfCdnFolders()
	{
		return _getChildFolderList(Constants.cdnRootFolder);
	}

	public static ArrayList getChildFolderList(String root)
	{
		return _getChildFolderList(root);
	}

	public static void writeFile(String fileName, String fileData) throws IOException
	{
		fileName = Constants.cdnRootFolder + Constants.slash + fileName;

		try (Writer writer = new BufferedWriter(new FileWriter(fileName));)
		{
			writer.append(fileData);
			System.out.println("cdn.utils.AppUtilities.writeFile() - fileName: " + fileName);
		}
	}

	public static String readFile(int version, String fileName, boolean minified) throws Exception
	{
		return readFile("v" + version + File.separator + fileName, minified);
	}

	public static String readFile(String fileName, boolean minified) throws Exception
	{
		if (fileName == null)
		{
			throw new NullPointerException("file name cannot be null");
		}

		fileName = Constants.resourcesFolder + fileName;

		StringBuilder builder = new StringBuilder();
		try (BufferedReader bufferedReader = new BufferedReader(new FileReader(fileName));)
		{
			String line = null;
			while ((line = bufferedReader.readLine()) != null)
			{
				if (minified)
				{
					builder.append(line.trim());
				} else
				{
					builder.append(line);
					builder.append(System.lineSeparator());
				}
			}
		}
		return builder.toString();
	}

	public static String getBodyEnd(int version) throws Exception
	{
		boolean minified = Constants.MODE.equals(Constants.MODE_PROD);
		return readFile(version, Constants.indexBodyEnd, minified);
	}

	public static String getHead(int version) throws Exception
	{
		boolean minified = Constants.MODE.equals(Constants.MODE_PROD);
		return readFile(version, Constants.indexHead, minified);
	}

	public static String getLogo() throws Exception
	{
		return readFile(Constants.indexLogo, false);
	}

	public static String getFileSize(long fileLength)
	{
		if ((fileLength / 1024) < 1024)
		{
			return String.format("%.2f", (fileLength / 1024f)) + " KB";
		}

		return String.format("%.2f", (fileLength / 1024f / 1024f)) + " MB";
	}

	public static String getAbout(int version) throws Exception
	{
		return ""
				+ "<br>"
				+ "<hr>"
				+ "<h6 class='text-right p-0 m-0'>"
				+ "Writter by - <a href='https://ershakiransari.github.io/cv' target='_blank'>Shakir Ansari</a>"
				+ "<br>&copy; Jaxer - " + (new Date().getYear() + 1900)
				+ " | Version - " + version
				+ "<!-- "
				+ "<br>Last updated on: " + new SimpleDateFormat("dd MMM, yyyy - HH:mm ").format(new Date())
				+ " -->"
				+ "</h6>";
	}
}
