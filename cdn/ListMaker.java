

import java.io.File;
import java.io.Writer;
import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.io.FileOutputStream;


/**
 *
 * @author Shakir Ansari
 */
public class ListMaker
{
	private static final String pwd = System.getProperty("user.dir") + File.separator + "vendors";
	private static final String file = pwd + File.separator + "file.txt";
	private static final String encoding = "UTF-8";
	
	public static void main(String[] args) throws Exception
	{
		try(Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), encoding));)
		{
			System.out.println("Working Directory = " + pwd);
		
			walk(pwd, writer);
		
			System.out.println("Completed");
		}
	}
	
	private static void walk(String root, Writer writer) throws Exception
	{
		writeToFile("folder:" + root.replace(pwd+ File.separator, "").toUpperCase(), writer);
		
		File[] fileList = new File(root).listFiles();
		
		for (int i = 0; i < fileList.length; i++)
		{
			File file = fileList[i];
			if (file.isFile())
			{
				writeToFile("file:" + file.getAbsolutePath().replace(pwd+ File.separator, "").toLowerCase(), writer);
			} else
			{
				walk(file.getAbsolutePath(), writer);
			}
		}
	}
	
	private static void writeToFile(String line, Writer writer) throws Exception
	{
		writer.append(line + System.lineSeparator());
	}
}