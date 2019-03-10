
package cdn.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
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

    public static String readFile(String fileName) throws Exception
    {
        return _readFile(fileName, true);
    }

    private static String _readFile(String fileName, boolean minified) throws Exception
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

    public static String getBodyEnd() throws Exception
    {
        return readFile(Constants.indexBodyEnd);
    }

    public static String getHead() throws Exception
    {
        return readFile(Constants.indexHead);
    }

    public static String printLogo() throws Exception
    {
        return _readFile(Constants.indexLogo, false);
    }

    public static String getFileSize(long fileLength)
    {
        if ((fileLength / 1024) < 1024)
        {
            return String.format("%.2f", (fileLength / 1024f)) + " KB";
        }

        return String.format("%.2f", (fileLength / 1024f / 1024f)) + " MB";
    }

    public static String getAbout() throws Exception
    {
        return "<hr>"
                + "<p class='text-right'>"
                + "&copy; SKR - " + (new Date().getYear() + 1900)
                + "<br>Updated on: " + new Date()
                + "</p>";
    }

}
