import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutterapp/components/age_input/age_input.dart';
import 'package:flutterapp/components/name_input/name_input.dart';
import 'package:http/http.dart' as http;
import 'package:google_fonts/google_fonts.dart';
import './env.dart';

void main() async {
  runApp(const MainApp());
}

class MainApp extends StatefulWidget {
  const MainApp({super.key});

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  String name = '';
  int age = 0;
  Color messageColor = Colors.white;
  String message = '';

  void onNameInputChange(String data) {
    name = data;
  }

  void onAgeInputchange(int data) {
    age = data;
  }

  void sendData() async {
    final response = await http.post(Uri.parse('${Env.apiURL}/info'),
        body: jsonEncode({'name': name, 'age': age}),
        headers: {"Content-Type": "application/json"});
    messageColor =
        response.statusCode == HttpStatus.ok ? Colors.green : Colors.red;
    message = json.decode(response.body)['message'];
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: const Color.fromRGBO(75, 85, 99, 1),
        body: Center(
          child: Form(
            child: Container(
              width: 360.0,
              height: 140.0,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8.0),
                  color: const Color.fromRGBO(17, 24, 39, 1)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  NameInput(
                    onChange: onNameInputChange,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  AgeInput(
                    onChange: onAgeInputchange,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  SizedBox(
                    width: 100,
                    child: TextButton(
                      onPressed: sendData,
                      style: ButtonStyle(
                          shape: MaterialStatePropertyAll(
                              RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(5.0))),
                          backgroundColor:
                              const MaterialStatePropertyAll(Colors.green)),
                      child: Text(
                        "Enviar",
                        style: GoogleFonts.roboto(fontSize: 14)
                            .copyWith(color: Colors.white),
                      ),
                    ),
                  ),
                  if (message.isNotEmpty) ...[
                    const SizedBox(
                      height: 10,
                    ),
                    Text(
                      message,
                      style: GoogleFonts.roboto(fontSize: 14)
                          .copyWith(color: Colors.white),
                    )
                  ]
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
