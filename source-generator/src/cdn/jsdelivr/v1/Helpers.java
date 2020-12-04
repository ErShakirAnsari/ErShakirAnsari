
package cdn.jsdelivr.v1;

import cdn.common.AppUtilities;
import cdn.common.ConsoleInput;
import cdn.github.utils.Constants;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Shakir
 */
public class Helpers
{
	private static final ConsoleInput consoleInput = new ConsoleInput();

	public static String getVersion() throws IOException
	{
		System.out.println("Please enter version in format of {major.minor.patch}");
		String version = consoleInput.readString();

		if (!AppUtilities.isValidVersioning(version))
		{
			System.out.println("Given version [" + version + "] is in invalid format. Valid format is {major.minor.patch}");
			version = null;
		}

		return version;
	}

	public static void readChangeLogs() throws IOException
	{
		System.out.println("Do you want update change logs? [Y/N]");
		String response = consoleInput.readString();

		if (!response.toLowerCase().equalsIgnoreCase("y"))
		{
			return;
		}

		List<String> changeLogs = new ArrayList<>();

		do
		{
			System.out.println("Please changes (one line only)");
			changeLogs.add(consoleInput.readString());

			System.out.println("Do you want add one more change log? [Y/N]");
			response = consoleInput.readString();
		} while (response.toLowerCase().equalsIgnoreCase("y"));

		System.out.println("Do you want to save change logs? [Y/N]");
		response = consoleInput.readString();

		if (!response.toLowerCase().equalsIgnoreCase("y"))
		{
			System.out.println("Not saved");
			return;
		}

		System.out.println("Saved");
	}

	public static String getFileLists()
	{
		ArrayList<String> list = new ArrayList<>();
		list = walker(list, Constants.cdnRootFolder);

		System.out.println("Helpers.getFileLists() - list.size(): " + list.size());

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
