
package cdn.jsdelivr.v1;

import cdn.common.AppUtilities;
import cdn.common.ConsoleInput;
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
}
