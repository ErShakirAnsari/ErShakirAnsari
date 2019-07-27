
package com.demo.api;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author SKR
 */
@javax.servlet.annotation.WebServlet(name = "DemoApi", urlPatterns = "/demoApi")
public class DemoApi extends javax.servlet.http.HttpServlet
{
	private static final long serialVersionUID = 1L;
	public static final String landingPage = "DemoApi";
	private static final Gson gson = new Gson();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
	{
		res.setHeader("Access-Control-Allow-Origin", "*");

		List<String> list = Arrays.asList(
				UUID.randomUUID().toString(),
				UUID.randomUUID().toString(),
				UUID.randomUUID().toString(),
				UUID.randomUUID().toString(),
				UUID.randomUUID().toString(),
				UUID.randomUUID().toString(),
				UUID.randomUUID().toString()
		);

		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		java.io.PrintWriter out = res.getWriter();
		out.write(gson.toJson(list));
		out.flush();
		out.close();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
	{
		res.setHeader("Access-Control-Allow-Origin", "*");

		String param0 = req.getParameter("p0");
		String param1 = req.getParameter("p1");

		System.out.println("param0: " + param0);
		System.out.println("param1: " + param1);

		HashMap<String, Long> hashMap = new HashMap<>();

		hashMap.put("serverTime", System.currentTimeMillis());
		hashMap.put("sum", Long.valueOf(param0) + Long.valueOf(param1));
		hashMap.put("sub", Long.valueOf(param0) - Long.valueOf(param1));
		hashMap.put("mult", Long.valueOf(param0) * Long.valueOf(param1));

		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		java.io.PrintWriter out = res.getWriter();
		out.write(gson.toJson(hashMap));
		out.flush();
		out.close();
	}
}
