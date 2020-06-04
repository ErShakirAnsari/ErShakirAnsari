
package cdn;

import cdn.github.utils.AppUtilities;
import cdn.github.utils.Constants;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.Writer;
import java.util.ArrayList;

/**
 *
 * @author Shakir Ansari
 */
public class Main
{
	public static void main(String[] args) throws Exception
	{
		if (args == null || args.length == 0)
		{
			throw new IllegalArgumentException("Please provide build mode [" + Constants.MODE_DEV + " OR " + Constants.MODE_PROD + "]");
		}

		int version = 3;
		Constants.MODE = args[0];
		System.out.println("Main.main() - Constants.MODE: " + Constants.MODE);

		try (Writer writer = new BufferedWriter(new FileWriter(Constants.indexFile));)
		{
			writer.append(AppUtilities.getLogo());
			writer.append(AppUtilities.getHead(version));

			writer.append("<script>");

			String fileList = "[" + System.lineSeparator() + getFileLists() + System.lineSeparator() + "]";

			AppUtilities.writeFile("fileList.json", fileList);
			writer.append("var timestamp=" + System.currentTimeMillis() + ";");
			writer.append("</script>");

			writer.append(AppUtilities.getAbout(version));
			writer.append(AppUtilities.getBodyEnd(version));

			System.out.println("cdn.CdnMain2.main() - " + Constants.indexFile);
			System.out.println("****************** DONE ******************");
		}
	}

	private static String getFileLists()
	{
		ArrayList<String> list = new ArrayList<>();
		list = walker(list, Constants.cdnRootFolder);

		System.out.println("cdn.CdnMain2.getFileLists() - list.size(): " + list.size());

		String response = "";
		for (String str : list)
		{
			response += "\t\"" + str.replace("\\", "/") + "\",";
		}

		return response
				.substring(0, response.length() - 1)
				.replace(",", "," + System.lineSeparator());
	}

	private static ArrayList walker(ArrayList list, String root)
	{
		File[] fileList = new File(root).listFiles();

		for (File file : fileList)
		{
			if (file.getName().startsWith("@")
					|| file.getName().equals("src"))
			{
				continue;
			}

			if (file.isDirectory())
			{
				walker(list, file.getAbsolutePath());
			} else
			{
				list.add(file.getAbsolutePath().replace(Constants.cdnRootFolder + File.separator, ""));
			}
		}
		return list;
	}
}
